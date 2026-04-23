import { useState, useRef } from "react";
// import { Icon } from "@iconify/react";
import { applyDigitalCameraEffect } from "../utils/applyFilter";

const PolaroidCard = () => {
const [image, setImage] = useState(null);
const [originalImage, setOriginalImage] = useState(null);
const [loading, setLoading] = useState(false);
const [filter, setFilter] = useState("flash");
const [hasAppliedFilter, setHasAppliedFilter] = useState(false);

    const canvasRef = useRef(null);

   const handleUpload = (e) => {
       const file = e.target.files[0];
       if (!file) return;

       const imgURL = URL.createObjectURL(file);

       setImage(imgURL);
       setOriginalImage(imgURL);
   };

  const applyFilter = () => {
      if (!originalImage) return;

      setLoading(true);

      const img = new Image();
      img.src = originalImage;

      img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          // ALWAYS reset from original
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          // apply ONLY current filter
          applyDigitalCameraEffect(ctx, canvas, filter);

          setImage(canvas.toDataURL("image/jpeg"));
          setHasAppliedFilter(true);

          setLoading(false);
      };
  };

  const handleDownload = () => {
      const canvas = canvasRef.current;

      const link = document.createElement("a");
      link.download = "digitify.jpg";
      link.href = canvas.toDataURL("image/jpeg", 0.9);

      link.click();
  };

   return (
       <>
           <div className="box-container">
               <canvas ref={canvasRef} style={{ display: "none" }} />

               <div className="camera-card">
                   <div className="frame-guides">
                       <div className="corner tl"></div>
                       <div className="corner tr"></div>
                       <div className="corner bl"></div>
                       <div className="corner br"></div>
                   </div>
                   <div className="top-bar">
                       <div className="rec">
                           <span className="dot"></span> REC
                       </div>

                       <div className="overlay">F2.8 | ISO 400 | 1/25s</div>
                   </div>

                   <div className="viewport">
                       {loading && (
                           <div className="loader-overlay">PROCESSING...</div>
                       )}

                       {image ? (
                           <img src={image} alt="preview" />
                       ) : (
                           <label className="upload-overlay">
                               <input
                                   type="file"
                                   accept="image/*"
                                   onChange={handleUpload}
                                   hidden
                               />

                               <div className="upload-content">
                                   <div className="upload-icon"></div>
                                   <h2>UPLOAD IMAGE</h2>
                                   <p>DRAG IMAGE OR CLICK TO BROWSE FILES</p>
                               </div>
                           </label>
                       )}
                   </div>
                   <div className="bottom-bar">
                       <div className="left">DIGICAM · 24mm · 4K</div>

                       <div className="right">00:12:45 · READY</div>
                   </div>
                   {image && (
                       <div className="filters">
                           {["flash", "nokia", "vintage", "night"].map((f) => (
                               <button
                                   key={f}
                                   onClick={() => setFilter(f)}
                                   className={filter === f ? "active" : ""}
                               >
                                   <span className="dot"></span>
                                   {f}
                               </button>
                           ))}
                       </div>
                   )}

                   {image && (
                       <button
                           className="apply-btn"
                           onClick={applyFilter}
                           disabled={loading}
                       >
                           APPLY FILTER
                       </button>
                   )}
               </div>
               <button
                   className="download-btn"
                   onClick={handleDownload}
                   disabled={!hasAppliedFilter || loading}
               >
                   ⬇ DOWNLOAD IMAGE
               </button>
           </div>
       </>
   );
};

export default PolaroidCard;
