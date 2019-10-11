import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Simple Blog title',
    author: 'Cecco Angioljuri',
    likes: 10,
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Simple Blog title Cecco Angioljuri'
  )
  expect(component.container).toHaveTextContent(
    'blog has 10 likes'
  )
})

test('clicking the button twice calls event handler twice', () => {
  const blog = {
    title: 'Simple Blog title',
    author: 'Cecco Angioljuri',
    likes: 10,
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})