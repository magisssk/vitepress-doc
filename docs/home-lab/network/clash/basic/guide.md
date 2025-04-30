---
title: Clash
description: Clash指南
tags:
  - clash
---

# Clash配置文件详解

## 前言

Clash 代理软件是一种开源的网络代理工具，网友喜欢称之为"小猫咪"，也是众多`Clash for Windows`、`Clash Verge`、`Clash
Nyanpasu`、`FlClash`、`Clash for Android`、`Clash Meta for Android`、`ClashX`、`ClashX Pro`等图形客户端的核心，用于帮助用户管理和配置网络代理服务。

## proxy(代理)

代理一般代理指的是我们的代理服务节点，比如自建或者机场提供的可以访问"互联网"的节点。

### proxy-providers(代理集)

如果你购买了机场，那么一般机场都会提供给你一堆的代理节点，此时我们就可以对这些节点按照一定的规则进行归类，这些个归类后的节点称之为代理集(
proxy-providers)。

```yaml
proxy-providers:
  hutao-sub:
    type: http
    url: "机场订阅地址"
    interval: 86400
```

### proxy-groups(代理组)

策略组的作用就是对代理集进行自由组合使用，当然它还提供了定时测速选择最优节点或者手动选择节点等功能。

```yaml
proxy-groups:
  - name: '🚀 Node'
    type: select
    use:
      - hutao-sub

  - name: '♻️ Auto Select'
    type: url-test
    use:
      - hutao-sub
    interval: '300'

  - name: '🇭🇰 HongKong'
    type: url-test
    use:
      - hutao-sub
    filter: 'HK|香港'
    interval: '600'

  - name: '🇨🇳 Taiwan'
    type: url-test
    use:
      - hutao-sub
    filter: 'TW|台湾'
    interval: '600'

  - name: '🇯🇵 Japan'
    type: url-test
    use:
      - hutao-sub
    filter: 'JP|日本'
    interval: '600'

  - name: '🇸🇬 Singapore'
    type: url-test
    use:
      - hutao-sub
    filter: 'SG|新加坡'
    interval: '600'

  - name: '🇺🇲 American'
    type: url-test
    use:
      - hutao-sub
    filter: 'UM|美国'
    interval: '600'
```

## rules(规则)

规则决定了访问指定地址时使用哪个代理，也就是我们说的分流规则。

### rule-providers(规则集)

规则负责将指定网络请求丢给指定的的代理去处理，仿佛左手请求，右手代理。那么首先要确定的就是网络请求，网络请求的界定既可以是一个特定的域名或者IP，也可以是特定域名结尾或者开头，亦或者是进程名称。我们一般将一组特定相关的请求归类到一起，称为规则集。

```yaml
rule-providers:
  adblock:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/adblock-rules.yaml
    interval: 86400
    enabled: true
  airport:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/airport-rules.yaml
    interval: 86400
    enabled: true
  apple:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/apple-rules.yaml
    interval: 86400
    enabled: true
  bilibili:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/bilibili-rules.yaml
    interval: 86400
    enabled: true
  developer:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/developer-rules.yaml
    interval: 86400
    enabled: true
```

### rules(规则)

最后我们来看下代理如何分流。一行分流策略包含两部分，请求+代理。请求可以来自于规则集匹配，代理则可以来自于策略组。没有匹配到规则的网路请求如果使用代理访问则称为白名单模式，直接请求不经过代理则是黑名单模式。

```yaml
rules:
  - RULE-SET,adblock,🛑 Adblock
  - RULE-SET,airport,✈️ Airport
  - RULE-SET,apple,🍎 Apple
  - RULE-SET,bilibili,📺 BiliBili
  - RULE-SET,developer,💻 Developer
  - RULE-SET,game,🎮 Game
  - RULE-SET,google,🌏 Google
  - RULE-SET,microsoft,Ⓜ️ Microsoft
  - RULE-SET,openai,🤖 OpenAI
  - RULE-SET,telegram,💬 Telegram
  - RULE-SET,adblock-online,🛑 Adblock
  - RULE-SET,telegram-online,💬 Telegram
  - GEOIP,CN,🎯 Direct
  - MATCH,🐟 Others
```

## 示例配置文件

```yaml
port: 7890
socks-port: 7891
redir-port: 7892
allow-lan: true
mode: rule
log-level: info
external-controller: '0.0.0.0:9090'
secret: ''
dns:
  enable: true
  ipv6: false
  listen: '0.0.0.0:53'
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 'https://doh.pub/dns-query'
    - 'https://dns.alidns.com/dns-query'
  fallback:
    - 'tls://1.0.0.1:853'
    - 'tls://8.8.4.4:853'
    - 'https://doh.opendns.com/dns-query'
  fallback-filter:
    geoip: true
    ipcidr:
      - 240.0.0.0/4

proxy-providers:
  hutao-sub:
    type: http
    url: "机场订阅地址"
    interval: 86400

proxy-groups:
  - name: '🚀 Node'
    type: select
    use:
      - hutao-sub

  - name: '♻️ Auto Select'
    type: url-test
    use:
      - hutao-sub
    interval: '300'

  - name: '🇭🇰 HongKong'
    type: url-test
    use:
      - hutao-sub
    filter: 'HK|香港'
    interval: '600'

  - name: '🇨🇳 Taiwan'
    type: url-test
    use:
      - hutao-sub
    filter: 'TW|台湾'
    interval: '600'

  - name: '🇯🇵 Japan'
    type: url-test
    use:
      - hutao-sub
    filter: 'JP|日本'
    interval: '600'

  - name: '🇸🇬 Singapore'
    type: url-test
    use:
      - hutao-sub
    filter: 'SG|新加坡'
    interval: '600'

  - name: '🇺🇲 American'
    type: url-test
    use:
      - hutao-sub
    filter: 'UM|美国'
    interval: '600'

  - name: 🛑 Adblock
    type: select
    proxies:
      - DIRECT
      - REJECT
  - name: ✈️ Airport
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: '🍎 Apple'
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: '📺 BiliBili'
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: '💻 Developer'
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: '🎮 Game'
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: '🌏 Google'
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: 'Ⓜ️ Microsoft'
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: 🤖 OpenAI
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: 💬 Telegram
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'
  - name: '🎯 Direct'
    type: select
    proxies:
      - DIRECT
      - '🚀 Node'
      - '♻️ Auto Select'
  - name: '🐟 Others'
    type: select
    proxies:
      - DIRECT
      - REJECT
      - '🚀 Node'
      - '♻️ Auto Select'
      - '🇭🇰 HongKong'
      - '🇨🇳 Taiwan'
      - '🇯🇵 Japan'
      - '🇸🇬 Singapore'
      - '🇺🇲 American'

rule-providers:
  adblock:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/adblock-rules.yaml
    interval: 86400
    enabled: true
  airport:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/airport-rules.yaml
    interval: 86400
    enabled: true
  apple:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/apple-rules.yaml
    interval: 86400
    enabled: true
  bilibili:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/bilibili-rules.yaml
    interval: 86400
    enabled: true
  developer:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/developer-rules.yaml
    interval: 86400
    enabled: true
  game:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/game-rules.yaml
    interval: 86400
    enabled: true
  google:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/google-rules.yaml
    interval: 86400
    enabled: true
  microsoft:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/microsoft-rules.yaml
    interval: 86400
    enabled: true
  openai:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/openai-rules.yaml
    interval: 86400
    enabled: true
  telegram:
    behavior: "classical"
    type: http
    url: https://cdn.jsdelivr.net/gh/wmz1024f/clash-rules@release/telegram-rules.yaml
    interval: 86400
    enabled: true
  adblock-online:
    behavior: "domain"
    type: http
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt
    interval: 86400
    enabled: true
  telegram-online:
    behavior: "domain"
    type: http
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt
    interval: 86400
    enabled: true

rules:
  - RULE-SET,adblock,🛑 Adblock
  - RULE-SET,airport,✈️ Airport
  - RULE-SET,apple,🍎 Apple
  - RULE-SET,bilibili,📺 BiliBili
  - RULE-SET,developer,💻 Developer
  - RULE-SET,game,🎮 Game
  - RULE-SET,google,🌏 Google
  - RULE-SET,microsoft,Ⓜ️ Microsoft
  - RULE-SET,openai,🤖 OpenAI
  - RULE-SET,telegram,💬 Telegram
  - RULE-SET,adblock-online,🛑 Adblock
  - RULE-SET,telegram-online,💬 Telegram
  - GEOIP,CN,🎯 Direct
  - MATCH,🐟 Others
```