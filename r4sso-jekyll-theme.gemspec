# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "r4sso-jekyll-theme"
  spec.version       = "0.0.1"
  spec.authors       = ["r4sso"]
  spec.email         = ["r4ssonull@gmail.com"]

  spec.summary       = %q{My awesome blog theme}
  spec.homepage      = "https://r4sso.github.com"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
