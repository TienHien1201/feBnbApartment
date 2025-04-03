import { useSearchParams } from 'react-router-dom'

// UseSearchParams is a hook that returns the search params of the current URL. UseSearchParams là từ reactRouterDom trả về các tham số tìm kiếm của URL hiện tại.
export default function useQueryParam() {
  const [searchPamrams] = useSearchParams()
  return Object.fromEntries([...searchPamrams])
}
