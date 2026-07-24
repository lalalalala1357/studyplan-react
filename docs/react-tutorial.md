# React 讀書計畫專案

## 1. 專案介紹

這是一個使用 React 製作的讀書計畫網站。

主要功能：

- 新增資料 C
- 查看資料 R
- 編輯資料 U
- 刪除資料 D
- 搜尋資料

## 2. 使用技術

| 技術           | 用途         |
| -------------- | ------------ |
| React          | 建立畫面     |
| TypeScript     | 檢查資料型別 |
| React Router   | 管理頁面     |
| Axios          | 呼叫後端 API |
| TanStack Query | 管理後端資料 |
| Zustand        | 管理搜尋文字 |
| CSS            | 設定網站樣式 |

## 3. 專案分層

```text
src/
├─ pages/       完整頁面
├─ components/  畫面元件
├─ services/    API 請求
├─ stores/      Zustand 狀態
└─ types/       TypeScript 型別
```

將不同功能放在不同資料夾，可以讓程式比較容易閱讀和修改。

## 4. React 元件與 JSX

元件是組成 React 畫面的基本單位。

```tsx
function App() {
  return <h1>讀書計畫</h1>;
}
```

`App` 是元件名稱，`return` 是要顯示的畫面。

React 使用 JSX 撰寫畫面。JSX 看起來很像 HTML，也可以使用大括號顯示資料：

```tsx
<p>計畫名稱：{plan.planName}</p>
```

`{plan.planName}` 會顯示計畫名稱。

## 5. useState 與事件

`useState` 用來保存會改變的資料：

```tsx
const [planName, setPlanName] = useState("");
```

- `planName`：目前的計畫名稱
- `setPlanName`：修改計畫名稱

輸入框使用 `onChange` 取得使用者輸入的內容：

```tsx
<input value={planName} onChange={(event) => setPlanName(event.target.value)} />
```

## 6. 顯示多筆資料

本專案使用 `map` 顯示每一筆計畫：

```tsx
{
  plans.map((plan) => <p key={plan.id}>{plan.planName}</p>);
}
```

`plans` 是全部資料，`map` 會逐筆顯示計畫名稱。

## 7. React Router

React Router 會根據網址顯示不同頁面：

```tsx
<Route
  path="/"
  element={<StudyPlanListPage />}
/>

<Route
  path="/studyplans/:id"
  element={<StudyPlanDetailPage />}
/>
```

- `/`：顯示列表頁
- `/studyplans/:id`：顯示詳細頁

`:id` 代表資料編號。

## 8. API 與狀態管理

### Axios

Axios 負責向後端發送請求：

```ts
const response = await axios.get(API_URL);
```

### TanStack Query

TanStack Query 負責管理後端資料：

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["studyplans"],
  queryFn: getStudyPlans,
});
```

- `data`：取得的資料
- `isLoading`：正在載入
- `error`：發生錯誤

### Zustand

Zustand 負責保存搜尋文字：

```tsx
const searchText = useStudyPlanUiStore((state) => state.searchText);
```

工具的分工：

```text
Axios          → 呼叫後端 API
TanStack Query → 管理後端資料
Zustand        → 管理前端搜尋文字
```

## 總結

這個專案使用 React 建立畫面，使用 React Router 管理頁面，使用 Axios 和 TanStack Query 取得後端資料，並使用 Zustand 管理搜尋功能。
