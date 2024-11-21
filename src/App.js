import Article from "./components/forum/Article";
import ArticleForm from "./components/forum/ArticleForm";
import ArticleList from "./components/forum/ArticleList";
import Login from "./components/forum/Login";

export default function App() {
  return (
    <div>
      <Login />
      <Article />
      <ArticleForm />
      <ArticleList />
    </div>
  );
}
