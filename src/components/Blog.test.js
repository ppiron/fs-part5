import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders only name and author', () => {
  const blog = {
    title: 'Simple Blog title',
    author: 'Cecco Angioljuri',
    likes: 10,
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Simple Blog title Cecco Angioljuri'
  )
  expect(component.container).not.toHaveTextContent(
    '10 likes'
  )
})

test('clicking the blog text once makes the other info visible', async () => {
  const blog = {
    title: 'Simple Blog title',
    author: 'Cecco Angioljuri',
    likes: 10,
    user: {
      name: 'Paolo'
    },
    url: 'https://www.google.com'
  }

  const mockHandler = jest.fn()

  const { container, getByText, findByText } = render(
    <Blog blog={blog} toggleBlogVisibility={mockHandler} visible={false} />
  )

  const div = getByText('Simple Blog title Cecco Angioljuri')
  const parentDiv = div.parentNode
  fireEvent(
    parentDiv,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  render(
    <Blog blog={blog} toggleBlogVisibility={mockHandler} visible={true} />,
    { container }
  )
  expect(mockHandler.mock.calls.length).toBe(1)
  const divo = await findByText('10 likes')
  console.log(prettyDOM(container.firstChild))
  expect(divo).toHaveTextContent(
    '10 likes'
  )
})