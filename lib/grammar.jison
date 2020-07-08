%lex

%%
\s+               { /* skip */ }
\d+(?:\.\d+)?     { return 'NUMBER'; }
'+'               { return '+'; }
'-'               { return '-'; }
'*'               { return '*'; }
'/'               { return '/'; }
'('               { return '('; }
')'               { return ')'; }
'['               { return '['; }
']'               { return ']'; }
'.'               { return '.'; }
'true'            { return 'BOOLEAN'; }
'false'           { return 'BOOLEAN'; }
[_a-zA-Z$][\w\$]* { return 'ID'; }
'>='              { return '>='; }
'<='              { return '<='; }
'>'               { return '>'; }
'<'               { return '<'; }
'==='             { return '==='; }
'!=='             { return '!=='; }
'&&'              { return '&&'; }
'||'              { return '||'; }
'?'               { return '?'; }
':'               { return ':'; }
%%

/lex

%left '?' ':'
%left '||'
%left '&&'
%left '>=' '<=' '>' '<' '===' '!=='
%left '+' '-'
%left '*' '/'

%start main

%%
  main
      : e
        { return $1 }
  ;
  e
      : NUMBER
        { $$ = Number(yytext) }
      | BOOLEAN
        { $$ = yytext === 'true' }
      | '-' e
        { $$ = { opt: '-', left: 0, right: $2 } }
      | e '-' e
        { $$ = { opt: '-', left: $1, right: $3 } }
      | e '+' e
        { $$ = { opt: '+', left: $1, right: $3 } }
      | e '*' e
        { $$ = { opt: '*', left: $1, right: $3 } }
      | e '/' e
        { $$ = { opt: '/', left: $1, right: $3 } }
      | e '>=' e
        { $$ = { opt: '>=', left: $1, right: $3 } }
      | e '<=' e
        { $$ = { opt: '<=', left: $1, right: $3 } }
      | e '>' e
        { $$ = { opt: '>', left: $1, right: $3 } }
      | e '<' e
        { $$ = { opt: '<', left: $1, right: $3 } }
      | e '===' e
        { $$ = { opt: '===', left: $1, right: $3 } }
      | e '!==' e
        { $$ = { opt: '!==', left: $1, right: $3 } }
      | e '&&' e
        { $$ = { opt: '&&', left: $1, right: $3 } }
      | e '||' e
        { $$ = { opt: '||', left: $1, right: $3 } }
      | '(' e ')'
        { $$ = $2 }
      | a
        { $$ = $1 }
      | t
        { $$ = $1 }
  ;
  a
      : ID
        { $$ = { id: $1 } }
      | a '[' e ']'
        { $$ = { type: 'access', left: $1, right: $3 } }
      | a '.' ID
        { $$ = { type: 'access', left: $1, right: $3 } }
  ;
  t
      : e '?' e ':' e
        { $$ = { opt: 'ternary', left: $1, middle: $3, right: $5 } }
  ;
%%
