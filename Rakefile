desc 'Default'
task default: [:lint, :test] do
end

desc 'Lint check JavaScript and CoffeeScript'
task lint: [:jshint, :jslint, :coffeelint, :rubocop] do
end

desc 'jshint'
task :jshint do
  sh 'jshint ljd-utils.js'
end

desc 'jslint'
task :jslint do
  sh 'jslint ljd-utils.js'
end

desc 'coffeelint'
task :coffeelint do
  sh 'coffeelint spec.coffee'
end

desc 'rubocop'
task :rubocop do
  sh 'rubocop Rakefile'
end

desc 'Word count'
task :wc do
  sh 'wc ljd-utils.js spec.coffee'
end

desc 'Compile specs'
task :coffee do
  sh 'coffee -c spec.coffee'
end

desc 'Test'
task :test do
  sh 'firefox spec.html'
end
