const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)

    const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue
    }
    return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const index = likes.indexOf(Math.max(...likes))
    const blog = blogs[index]
    delete blog._id
    delete blog.__v
    delete blog.url
    return blog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}