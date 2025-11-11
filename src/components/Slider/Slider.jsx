import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import img1 from "../../assets/banner/banner-1.jpg";
import img2 from "../../assets/banner/banner-2.jpg";
import img3 from "../../assets/banner/banner-3.jpg";

const images = [img1, img2, img3];
const sliderTexts = [
  {
    title: "Thousands Treated, Lives Changed",
    subtitle: "Our medical camps have brought healthcare to remote communities.",
    caption: "Over 5,000 patients served across 50+ successful camps.",
  },
  {
    title: "A Step Toward Healthier Futures",
    subtitle: "From basic checkups to life-saving treatments, we made a difference.",
    caption: "Smiles returned. Wounds healed. Hope restored.",
  },
  {
    title: "Together, We Care",
    subtitle: "Volunteers, doctors, and participants united for a healthier tomorrow.",
    caption: "Every camp is a story of compassion and impact.",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "95%",
        margin: "auto",
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        height: { xs: "250px", md: "500px" },
      }}
    >
      {/* Slides */}
      {images.map((img, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            inset: 0,
            transition: "opacity 1s ease-in-out",
            opacity: index === currentIndex ? 1 : 0,
          }}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // ensures image fills the box nicely
              transition: "transform 0.6s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(0,0,0,0.4))",
            }}
          />

          {/* Text Content */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              px: 3,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                textShadow: "2px 2px 12px rgba(0,0,0,0.5)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {sliderTexts[index].title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                textShadow: "1px 1px 8px rgba(0,0,0,0.4)",
                fontWeight: 500,
              }}
            >
              {sliderTexts[index].subtitle}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontStyle: "italic",
                textShadow: "1px 1px 6px rgba(0,0,0,0.3)",
              }}
            >
              {sliderTexts[index].caption}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Navigation Buttons */}
      <Button
        onClick={prevSlide}
        aria-label="Previous Slide"
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.6)",
          color: "#333",
          minWidth: "50px",
          height: "50px",
          borderRadius: "50%",
          fontSize: "24px",
          fontWeight: "bold",
          "&:hover": { bgcolor: "rgba(255,255,255,0.85)" },
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        ❮
      </Button>
      <Button
        onClick={nextSlide}
        aria-label="Next Slide"
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.6)",
          color: "#333",
          minWidth: "50px",
          height: "50px",
          borderRadius: "50%",
          fontSize: "24px",
          fontWeight: "bold",
          "&:hover": { bgcolor: "rgba(255,255,255,0.85)" },
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        ❯
      </Button>

      {/* Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1.5,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: index === currentIndex ? 16 : 12,
              height: index === currentIndex ? 16 : 12,
              borderRadius: "50%",
              background: index === currentIndex
                ? "linear-gradient(135deg, #38b2ac, #06b6d4)"
                : "rgba(255,255,255,0.6)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: index === currentIndex ? "0 0 6px rgba(0,0,0,0.3)" : "none",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slider;
