# 排序演算法視覺化 (Sorting Visualizer)

一個互動式的排序演算法視覺化網頁應用程式，幫助理解不同排序演算法的執行過程。

## 開發記錄

| 項目 | 內容 |
|------|------|
| **開發工具** | Claude Code |
| **運算平台** | DGX Spark |
| **模型推理服務** | vLLM |
| **模型** | Qwen/Qwen3-Coder-Next-FP8 |
| **開發方式** | 純 prompt |
| **開發時間** | 約 15 分鐘 |
| **程式碼行數** | 約 600+ 行 |

### Prompt
```
幫我建立一個排序演算法視覺化的網頁應用程式。需求如下：

支援 Bubble Sort、Quick Sort、Merge Sort 至少三種排序
要有流暢的動畫展示排序過程
UI 要現代、漂亮，使用深色主題
用純 HTML/CSS/JavaScript，不需要後端
所有檔案放在 ~/sort-visualizer 資料夾
```

## 功能特點

- **多種排序演算法**：支援 Bubble Sort、Quick Sort、Merge Sort、Selection Sort、Insertion Sort
- **動態控制**：可調整陣列大小（10-100）和動畫速度
- **視覺化演示**：即時顯示排序過程中的比較、交換操作
- **統計數據**：追踪比較次數、交換次數和執行時間
- **深色主題**：現代化 UI 設計，保護視力並提供良好體驗

## 技術細節

### 演算法複雜度

| 演算法 | 時間複雜度 (平均) | 空間複雜度 | 穩定性 |
|--------|------------------|-----------|--------|
| Bubble Sort | O(n²) | O(1) | 穩定 |
| Quick Sort | O(n log n) | O(log n) | 不穩定 |
| Merge Sort | O(n log n) | O(n) | 穩定 |
| Selection Sort | O(n²) | O(1) | 不穩定 |
| Insertion Sort | O(n²) | O(1) | 穩定 |

### 專案結構
```
sort-visualizer/
├── index.html    # 主頁面結構
├── styles.css    # 樣式檔案（深色主題）
├── script.js     # 排序演算法實作
└── README.md     # 專案說明文件
```

## 使用方法

1. 打開 `index.html` 檔案（可直接在瀏覽器中開啟）
2. 選擇想要的排序演算法
3. 調整陣列大小和動畫速度（可選）
4. 點擊「生成陣列」建立新的隨機資料
5. 點擊「開始排序」觀察排序過程
6. 如需中斷，可點擊「停止」按鈕

## 操作說明

### 陣列大小
- 拖曳滑桿調整陣列元素數量（10-100）
- 數值越大，動畫時間越長

### 動畫速度
- **慢**：速度值 1-15，適合觀察細節
- **中**：速度值 16-35，一般觀察
- **快**：速度值 36-50，快速完成

### 色碼說明
| 色彩 | 含義 |
|------|------|
| 藍色 | 未排序的元素 |
| 紅色 | 正在比較的元素 |
| 黃色 | 正在交換的元素 |
| 綠色 | 已完成排序的元素 |

## 開發說明

### 演算法實作亮點

- **Bubble Sort**：使用 async/await 控制比較和交換的動畫節奏
- **Quick Sort**：遞迴實作，包含 partition 分區函數
- **Merge Sort**：使用輔助陣列進行合併操作，確保穩定性
- **Selection Sort**：每次找到最小值並放置到正確位置
- **Insertion Sort**：透過交換或移位方式建立排序序列

### 狀態管理
```javascript
const state = {
    array: [],           // 當前陣列
    sorting: false,      // 是否正在排序
    stopRequested: false // 是否收到停止請求
};
```

### 動畫控制
使用 `async/await` 搭配 `Promise` 和 `setTimeout` 實現精確的動畫延遲控制，確保 DOM 更新與資料同步。

## 瀏覽器支援

- Chrome/Edge (推薦)
- Firefox
- Safari
- Opera

## 版本資訊

- **版本**：v1.0.0
- **最後更新**：2026-03-12
- **作者**：Claude AI Assistant

## 授權

本專案為教育用途創作，可自由使用和修改。
