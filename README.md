# ip-domain-filter
Validates IPs (IPv4 and IPv6) and domain names using micromatch ruleset. Can be used for IP/Domain whitelisting functionality.

## Install
```
npm i ip-domain-filter --save
```

## Usage

```js
const hostFilter = require('ip-domain-filter');

let rules = [{
    category: 'ip',
    allowed: ['127.0.0.2', '127.0.0.4', '127.0.0.6']
  },
  {
    category: 'domain',
    allowed: ['localhost', 'google.com']
  },
  {
    category: 'ipRange',
    allowed: ['127.1.0.8', '127.1.0.20']
  },
  {
    category: 'ip',
    allowed: ['192.168.??.1']
  },
  {
    category: 'ip',
    allowed: ['192.168.1.*']
  }
];

let caseA = '192.168.10.1';
hostFilter.filter(caseA, rules);
// Returns true as it matches 4th rule.

let caseB = '192.168.2.1';
hostFilter.filter(caseB, rules);
// Returns false as it does'nt match any of the rules.


```
> For more use-cases see the [tests](./test/test.js)

**Params**

* `ip` **{String}**: Accepts IP and Domain names.
* `rules` **{Array}**: Filter rules/conditions.
* `returns` **{Bool}**: If there is a match it returns `true`, otherwise `false`.

### Rules

Rule will be an object array having 2 parameters `category` and `allowed`.

| Category  | Description   |
| :------------ | :------------ |
| ip | To check whether the given IP is valid in a list of IP's. |
| ipRange | To check whether the given ip is in a range or not.  |
| domain | To check wheter the domain matches a given list of domains. |

## Examples

**(1)** Rule using `ip`,
This will check whether the given ip is available in the allowed list or not.
```
let rules = [{
    category: 'ip',
    allowed: ['127.0.0.2', '127.0.0.4', '127.0.0.6']
  }
]
```
**(2)** Rule using `ipRange`,
This will check whether the given ip is between the specified range or not.

*Note: In the case of **ipRange**, `allowed` should have only 2 values, [ipStart, ipEnd]*
```
let rules = [{
    category: 'ipRange',
    allowed: ['127.1.0.8', '127.1.0.20']
  }
]
```
**(3)** Rule using `domain`,
This will check whether the given domain is between the specified list or not.

```
let rules = [{
    category: 'domain',
    allowed: ['localhost', 'google.com']
  }
]
```

### Extended Useage
**(4)** Rule using `ip` with micromatch,
This will check whether the given ip is in the format `192.168.*.1`. And the `*` can be any character.
```
let rules = [{
    category: 'ip',
    allowed: ['192.168.*.1']
  }
]

// 192.168.1.1 - true
// 192.168.10.1 - true
// 192.168.1.2 - false
```

**(5)** Rule using `ip` with micromatch,
This will check whether the given ip is in the format `192.168.?.1`. And the `?` can be any character from 0 to 9.
```
let rules = [{
    category: 'ip',
    allowed: ['192.168.?.1']
  }
]

// 192.168.1.1 - true
// 192.168.9.1 - true
// 192.168.10.1 -  false
```
