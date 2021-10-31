#!ruby -W0

require 'json'

engineValue = ARGV[0].nil? ? '' : ARGV[0]
text = ARGV[1]
patternValue = ARGV[2]
flagsValue = ARGV[3].nil? ? '' : ARGV[3]

def exitWithResponse(response)
    puts JSON.pretty_generate(response)
    exit response.key?(:error) ? 1 : 0
end

if patternValue.nil?
    exitWithResponse({engineValue: engineValue, error: {message: 'invalid pattern'}})
end

if text.nil?
    exitWithResponse({engineValue: engineValue, error: {message: 'invalid text'}})
end

# patternValue =~ /^\/(.*)\/(.*)$/m
# pattern = '(' + ($1.nil? ? patternValue : $1) + ')'
# flags = $2.nil? ? '' : $2

begin
    regexpObject = flagsValue == '' ? Regexp.new('(' + patternValue + ')') : Regexp.new('((?' + flagsValue + ')' + patternValue + ')')
rescue
    exitWithResponse({engineValue: engineValue, error: {message: 'invalid pattern'}})
end

matches = text.enum_for(:scan, regexpObject).map {
  |result| {index: Regexp.last_match.begin(0), substring: result.kind_of?(Array) ? result[0] : result}
}
exitWithResponse({engineValue: engineValue, matches: matches})
