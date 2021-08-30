import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('rendering content', () => {

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeClick={updateLike}/>
    )
  })
  const blog = {
    title: 'In Russia',
    author: 'Constanze',
    url: 'www.google.fi',
    likes: '99',
    user: {
      username: 'Gustav',
      name: 'Gustav',
      id:'611e253f98a28e56f933446f'
    }
  }
  const updateLike = jest.fn()

  test('renders only default content', () => {
    expect(component.container).toHaveTextContent('In Russia')
    expect(component.container).toHaveTextContent('Constanze')
    expect(component.container).not.toHaveTextContent('www.google.fi')
    expect(component.container).not.toHaveTextContent('99')
    component.debug()
  })

  test('renders also hidden content after pushing button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('www.google.fi')
    expect(component.container).toHaveTextContent('99')
    component.debug()
  })

  test('like button pushed twice renders two event handler calls', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateLike.mock.calls).toHaveLength(2)
  })

})