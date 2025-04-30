---
title: Clash 规则自动化部署方案
description: 使用GitHub Actions和jsDelivr实现Clash规则的自动化发布与多端同步。
---

# Clash 规则自动化部署方案（GitHub + jsDelivr）

## 背景

为了实现多端同步Clash规则，我们通过`GitHub Actions`自动发布规则并借助`jsDelivr CDN`进行同步，避免手动更新规则或依赖于内网方案。

---

## 项目结构

```shell
.
├── domain
│   └──google-rules.yaml
├── ip
│   └──google-rules.yaml
├── .github
│   └── workflows
│       └── deploy.yaml
└── publish/（GitHub Action 自动生成）
```

microsoft-rules.yaml示例如下

```yaml
payload:
  - DOMAIN-SUFFIX,bing.com
  - DOMAIN-SUFFIX,bing.net
  - DOMAIN-SUFFIX,copilot.microsoft.com
  - DOMAIN-SUFFIX,microsoft.com

  - DOMAIN-KEYWORD,microsoft
```

deploy.yaml示例如下

```yaml
name: purge-cdn

on:
  push:
    branches: [ master ]
    paths:
      - '**/*-rules.yaml'
      - '.github/workflows/**'
  # 每天 UTC 03:00 运行一次（北京时间 11:00）
  schedule:
    - cron: '0 3 * * *'
  workflow_dispatch:

# github actions中允许write到其余分支
permissions:
  contents: write

jobs:
  build-rules:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Prepare rules
        run: |
          mkdir -p publish/ip
          mkdir -p publish/domain
          
          cp -r ip/* ./publish/ip/
          cp -r domain/* ./publish/domain/

      - name: Push to release branch
        run: |
          cd publish
          git init
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git switch -C release
          git add .
          git commit -m "Update Clash rules"
          git remote add origin "https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}"
          git push -f origin release

      - name: Purge jsDelivr CDN
        run: |
          cd publish
          for file in $(ls); do
            echo "Purging: $file"
            curl -s -i "https://purge.jsdelivr.net/gh/${{ github.repository }}@release/${file}"
          done
```