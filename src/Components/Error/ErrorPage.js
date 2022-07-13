import React from 'react'

function ErrorPage() {

  const styling = {
    textAlign: "center",
    margin: "50px 0 10px",
    fontSize: "22px",
    color: "white",
  }

  const imageStyling = {
    display: "block",
    width: "400px",
    margin: "10px auto 50px",
  }

  return (
    <div>
      <h1 style={styling}>404 ERROR PAGE NOT FOUND!!</h1>
      <img style={imageStyling} src='https://res.cloudinary.com/span/image/upload/v1626893577/wobb/caveman_kwu2md.gif' alt='error-img' />
    </div>
  )
}

export default ErrorPage;