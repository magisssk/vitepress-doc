---
title: Windows KMS 指南
description: 家庭环境下合法激活Windows系统的操作指南
---

# Windows KMS 激活指南

::: warning 法律提示
请确保您拥有合法的Windows许可证，本指南仅适用于**批量授权版本**的本地激活
:::

## 什么是 KMS？

KMS（Key Management Service）是微软提供的一种批量激活服务，允许组织通过本地服务器批量激活 Windows 和 Office 等产品。

KMS 不需要将每一台设备都连接微软，而是通过一台本地服务器进行周期性验证。

## Windows激活

### 配置 GVLK

可访问[微软官网](https://learn.microsoft.com/zh-cn/windows-server/get-started/kms-client-activation-keys?tabs=server2025%2Cwindows1110ltsc%2Cversion1803%2Cwindows81)
获取公开的Windows GVLK，选择对应版本的GVLK

请用**管理员权限**打开`命令提示符(CMD)`

```shell
slmgr /ipk <product key>
```

### 配置 KMS 服务器

```shell
slmgr -skms <kms server>
```

### 激活Winodws

```shell
slmgr -ato
```

## Office 激活

可访问[微软官网](https://learn.microsoft.com/zh-cn/office/volume-license-activation/gvlks#gvlks-for-office-ltsc-2024)
获取公开的Office GVLK，选择对应版本的GVLK

::: warning 版本
GVLK仅适用于以下版本：

- `Office LTSC 2024`
- `Office LTSC 2021`
- `Office 2019`和`Office 2016`的批量许可版本，包括`Project`和`Visio`
  :::

请用**管理员权限**打开`命令提示符(CMD)`

### 配置 GVLK

```shell
cscript "C:\Program Files\Microsoft Office\Office16\ospp.vbs" /inpkey:<product key>
```

### 配置 KMS 服务器

```shell
cscript "C:\Program Files\Microsoft Office\Office16\ospp.vbs" /sethst:<kms server>
```

### 激活Office

```shell
cscript "C:\Program Files\Microsoft Office\Office16\ospp.vbs" /act
```
