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

module.exports = {
    dummy,
    totalLikes
}