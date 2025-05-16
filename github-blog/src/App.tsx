import '../src/pages/Home.css'
import { Home } from '../src/pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PostOne } from './pages/posts/post-one'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-one/:number" element={<PostOne />} />
      </Routes>
    </BrowserRouter>
  )
}

