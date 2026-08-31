# Lucas GitHub Showcase

基于 VitePress 的 GitHub 项目展示站。

```bash
npm install
npm run dev
```

默认展示 `KingofSaltyFish` 的公开仓库。切换账号：

```bash
VITE_GITHUB_USER=你的用户名 npm run dev
```

## 部署到 Vercel

1. 把本目录推送到 GitHub。
2. 在 Vercel 导入该仓库。
3. Framework Preset 选择 **VitePress**（通常会自动识别），点击 Deploy。
4. 如需展示其他账号，在 Vercel 添加环境变量 `VITE_GITHUB_USER`。

构建命令为 `npm run build`，输出目录为 `docs/.vitepress/dist`。
