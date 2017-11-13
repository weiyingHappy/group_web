import React from 'react'
import { Input } from 'antd'

function SearchBar({ dispatch, router, bindName, value, placeholder }) {
  return (
    <Input.Search
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        const payload = {}
        payload[bindName || 'query'] = e.target.value
        dispatch({
          type: `${router.model}/changeSearch`,
          payload: { ...payload },
        })
      }}
      onSearch={() => {
        dispatch({
          type: `${router.model}/query`,
        })
      }}
    />
  )
}

export default SearchBar
