import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Container from "../common/Container";

const PostContainer = styled.div(() => ({
  width: "300px",
  margin: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  overflow: "hidden",
}));

const CarouselContainer = styled.div(() => ({
  position: "relative",
}));

const Carousel = styled.div(() => ({
  display: "flex",
  overflowX: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  position: "relative",
}));

const CarouselItem = styled.div(() => ({
  flex: "0 0 auto",
  scrollSnapAlign: "start",
}));

const Image = styled.img(() => ({
  width: "280px",
  height: "auto",
  maxHeight: "300px",
  padding: "10px",
}));

const Content = styled.div(() => ({
  padding: "10px",
  "& > h2": {
    marginBottom: "16px",
  },
}));

const ProfileLogo = styled.div(() => ({
  backgroundColor: "#808080",  
  height: "50px",
  width: "50px",  
  borderRadius: "50%",
  position:"absolute",
  display: "flex",  
  alignItems: "center",
  justifyContent: "center",
  margin: "2px 15px 2px 2px",  
  color: "white",
  fontWeight: "bold",
  fontSize: "1.2em",  
}));

const ProfileContainer = styled.div(() => ({  
  marginLeft: "10px",    
  position:"inline-block",
  display: "flex",    
  alignItems: "center",  
  justifyContent: "flex-start",
  margin: "10px 10px 0px",  
  fontWeight: "bold",
  fontSize: "1.2em",
  flexGrow: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const Button = styled.button(() => ({
  position: "absolute",
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  border: "none",
  color: "#000",
  fontSize: "20px",
  cursor: "pointer",
  height: "50px",
}));

const PrevButton = styled(Button)`
  left: 10px;
  position: absolute;
  top: 50%;
  translatey: -50%;
`;

const NextButton = styled(Button)`
  right: 10px;
  top: 50%;
  position: absolute;
  translatey: -50%;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft =
        currentIndex * carouselRef.current.offsetWidth;
    }
  }, [currentIndex]);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, post.images.length - 1)
    );
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const getAbrevation =  (username) => {
    if(username!= null && username != undefined){
      const tmp = username.split(' ')      
      return (tmp[0][0] + tmp[1][0]);
    }
  }

  return (
    <PostContainer>
      <ProfileContainer>
        <ProfileLogo>{getAbrevation(post.user.name)}</ProfileLogo>
        <div style={{position:"relative", overflow:"hidden", textOverflow:"ellipsis", marginLeft:"60px"}}>{post.user.name}<br/>
        <div style={{fontWeight:"normal", fontSize:"0.9em"}}>{post.user.email}</div></div>
      </ProfileContainer>

      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
