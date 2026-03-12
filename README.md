## 開發記錄

| 項目         | 內容                        |
| ---------- | ------------------------- |
| **開發工具**   | Claude Code               |
| **運算平台**   | DGX Spark                 |
| **模型推理服務** | vLLM                      |
| **模型**     | Qwen/Qwen3-Coder-Next-FP8 |
| **開發方式**   | 純 prompt                  |
| **程式碼行數**  | 約 600+ 行                  |

### Prompt
```
幫我建立一個排序演算法視覺化的網頁應用程式。需求如下：

支援 Bubble Sort、Quick Sort、Merge Sort 至少三種排序
要有流暢的動畫展示排序過程
UI 要現代、漂亮，使用深色主題
用純 HTML/CSS/JavaScript，不需要後端
所有檔案放在 ~/dgx-side-project/sort-visualizer 資料夾
```

## 功能特點

- **多種排序演算法**：支援 Bubble Sort、Quick Sort、Merge Sort、Selection Sort、Insertion Sort
- **動態控制**：可調整陣列大小（10-100）和動畫速度
- **視覺化演示**：即時顯示排序過程中的比較、交換操作
- **統計數據**：追踪比較次數、交換次數和執行時間
- **深色主題**：現代化 UI 設計，保護視力並提供良好體驗