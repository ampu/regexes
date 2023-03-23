#!/usr/bin/perl

use utf8;
use strict;
use JSON;

sub exitWithResponse {
    my $response = shift;
    my $json = JSON->new->utf8(1)->pretty(1)->encode($response);
    print $json;
    exit(exists($response->{error}) ? 1 : 0);
}

my ($regexp, $input) = @ARGV;

if (not defined $regexp) {
    my %response = ('error' => 'invalid regexp');
    exitWithResponse \%response;
}

if (not defined $input) {
    my %response = ('error' => 'invalid input');
    exitWithResponse \%response;
}

my ($pattern, $flags) = $regexp =~ m/^\/(.*)\/(.*)$/;
$pattern = defined $pattern ? $pattern : $regexp;

my @match = defined $flags
    ? $input =~ m/(?$flags)($pattern)/
    : $input =~ m/($pattern)/;

my %response = ('match' => \@match);
exitWithResponse \%response;
