"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusic, setIsMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [copied, setCopied] = useState(false);
  const images = [
    "/img/images1.jpg",
    "/img/images2.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("1234 5678 9101");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const targetDate = new Date("2025-02-13T00:00:00").getTime();

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(countdown);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Auliya+%26+Suami&dates=20250213T000000Z/20250213T235900Z&details=Kami+mengundang+Anda+untuk+hadir+di+hari+bahagia+kami!&location=Lokasi+Pernikahan`;


  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Autoplay error:", err));
      setIsMusic(true);
    }
  };

  const handleToggleMusic = () => {
    if (audioRef.current) {
      if (isMusic) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Audio play error:", err));
      }
      setIsMusic(!isMusic);
    }
  };

  return (
    <div className="position-relative" style={{ padding: 0, margin: 0, overflow: "hidden" }}>
      {/* Section 0 - Cover */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpen ? "-100%" : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="d-flex align-items-center justify-content-center vh-100 text-white position-fixed w-100"
        style={{
          backgroundImage: "url('img/photo1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}></div>

        <div className="text-center p-4 position-relative" style={{ zIndex: 1 }}>
          <p className="mb-1">The Wedding Of</p>
          <h1 className="fw-bold" style={{ fontFamily: "cursive" }}>Auliya & Suami</h1>
          <p className="mb-3">Kamis, 13 Februari 2025</p>
          <p className="mb-3">Kpd Bpk/Ibu/Saudara/i</p>
          <button className="btn btn-light" onClick={handleOpen}>
            <i className="bi bi-envelope"></i> Buka Undangan
          </button>
          <p className="mt-3 small">Mohon maaf apabila ada kesalahan penulisan nama/gelar</p>
        </div>
      </motion.div>

      {/* Section 1 - Opening */}
      <div
        className="d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: "url('img/photo2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll", // Ubah dari 'fixed' ke 'scroll'
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
        <div className="p-4 position-relative" style={{ zIndex: 1 }}>
          <h2>The Wedding Of</h2>
          <h1 className="fw-bold" style={{ fontFamily: "cursive" }}>Auliya & Suami</h1>
        </div>
      </div>


      {/* Section 2 - Caption Islami */}
      <div
        className="d-flex align-items-center justify-content-center vh-100 text-white text-center"
        style={{
          backgroundColor: "#a47551",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100"></div>
        <div className="p-4 position-relative" style={{ zIndex: 1 }}>
          <h2 className="fw-bold" style={{ fontFamily: "cursive" }}>بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>
          <p className="fst-italic">"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."</p>
          <p className="fw-bold">- QS. Ar-Rum: 21 -</p>
        </div>
      </div>

      {/* Section 3 - Nama Mempelai */}
      <div className="text-center py-5"
        style={{
          backgroundColor: "#e8d4cc",
        }}>
        <h2 className="fw-bold mb-5">We Are Getting Married</h2>

        {/* Mempelai Wanita */}
        <div className="d-flex align-items-center justify-content-md-start ms-md-5 flex-row gap-3 mb-5">
          <img src="img/mempelai1.png" alt="Mempelai Wanita" className="img-fluid rounded-circle" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
          <div className="text-center">
            <h1 className="fw-bold">Auliya</h1>
            <p className="text-muted">Putri dari Bpk. Ahmad & Ibu Siti</p>
            <button className="btn btn-secondary"><i className="bi bi-instagram"></i> @auliyah</button>
          </div>
        </div>

        {/* Mempelai Pria */}
        <div className="d-flex align-items-center justify-content-md-start me-md-5 flex-row-reverse gap-3">
          <img src="img/mempelai2.png" alt="Mempelai Pria" className="img-fluid rounded-circle" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
          <div className="text-center">
            <h1 className="fw-bold">Suami</h1>
            <p className="text-muted">Putra dari Bpk. Budi & Ibu Ani</p>
            <button className="btn btn-secondary"><i className="bi bi-instagram"></i> @suami</button>
          </div>
        </div>
      </div>

      {/* Section 4 - Countdown */}
      <div className="d-flex flex-column align-items-center text-center py-5" style={{
        backgroundColor: "#a47551",
        color: "white"
      }}>
        <div className="card animated-card p-4 box-countdown" style={{
          backgroundColor: "#e8d4cc",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}>
          <h2 className="fw-bold">Count The Date</h2>
          <p className="text-muted">Siang dan malam berganti begitu cepat, di antara saat-saat mendebarkan yang belum pernah kami rasakan sebelumnya. Kami nantikan kehadiran para keluarga dan sahabat, untuk menjadi saksi ikrar janji suci kami di hari yang bahagia.</p>

          {/* Countdown Timer */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <div className="box-countdown-item text-white p-3 rounded shadow text-center">
              <h3>{timeLeft.days}</h3>
              <small>Hari</small>
            </div>
            <div className="box-countdown-item text-white p-3 rounded shadow text-center">
              <h3>{timeLeft.hours}</h3>
              <small>Jam</small>
            </div>
            <div className="box-countdown-item text-white p-3 rounded shadow text-center">
              <h3>{timeLeft.minutes}</h3>
              <small>Menit</small>
            </div>
            <div className="box-countdown-item text-white p-3 rounded shadow text-center">
              <h3>{timeLeft.seconds}</h3>
              <small>Detik</small>
            </div>
          </div>

          {/* Tombol Tambah ke Google Calendar */}
          <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
            <i className="bi bi-calendar-event"></i> Tambahkan ke Google Calendar
          </a>
        </div>

        {/* Teks Undangan */}
        <div className="mt-5 px-3" style={{ maxWidth: "900px" }}>
          <p className="fw-bold">
            Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/I untuk menghadiri acara pernikahan kami:
          </p>
        </div>
      </div>

      {/* Section 5 - Card Akad & Resepsi */}
      <div className="py-5 text-center" style={{ backgroundColor: "#e8d4cc" }}>
        <div className="container">
          <div className="row justify-content-center">
            {/* Akad Nikah */}
            <div className="col-md-8 col-sm-10 mb-4">
              <div className="card-resepsi p-4 shadow-sm position-relative" style={{
                borderRadius: "15px",
                backgroundImage: "url('img/flower1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
              }}>
                {/* Overlay Gelap */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderRadius: "15px",
                }}></div>

                <div className="position-relative text-white">
                  <i className="bi bi-calendar2-heart fs-1"></i>
                  <h3 className="fw-bold">Akad Nikah</h3>
                  <p>Kamis, 13 Februari 2025</p>
                  <p>Pukul: 09:00 WIB</p>
                  <p>Alamat: Masjid Agung, Kota XYZ</p>
                  <a href="https://goo.gl/maps/example" target="_blank" className="btn btn-primary">
                    <i className="bi bi-geo-alt"></i> Lihat Lokasi
                  </a>
                </div>
              </div>
            </div>

            {/* Resepsi */}
            <div className="col-md-8 col-sm-10 mb-4">
              <div className="card-resepsi p-4 shadow-sm position-relative" style={{
                borderRadius: "15px",
                backgroundImage: "url('img/flower1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
              }}>
                {/* Overlay Gelap */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderRadius: "15px",
                }}></div>

                <div className="position-relative text-white">
                  <i className="bi bi-balloon-heart fs-1"></i>
                  <h3 className="fw-bold">Resepsi</h3>
                  <p>Kamis, 13 Februari 2025</p>
                  <p>Pukul: 19:00 WIB</p>
                  <p>Alamat: Gedung Serba Guna, Kota XYZ</p>
                  <a href="https://goo.gl/maps/example" target="_blank" className="btn btn-primary">
                    <i className="bi bi-geo-alt"></i> Lihat Lokasi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 6 - Amplop Digital */}
      <div className="d-flex flex-column align-items-center justify-content-center text-center py-5" style={{ background: "#a47551" }}>
        <div className="card p-4 shadow" style={{ maxWidth: "400px", background: "#e8d4cc" }}>
          <img src="./img/flower1.jpg" alt="Flower" className="img-fluid mb-3" />
          <h4 className="mb-3">Amplop Digital</h4>
          <p className="text-muted">
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>
          <button className="btn btn-primary mt-3" onClick={() => setShowBankDetails(!showBankDetails)}>
            Kirim Amplop
          </button>
        </div>

        {showBankDetails && (
          <div className="card mt-4 p-4 shadow animated-card" style={{ maxWidth: "400px", background: "#e8d4cc" }}>
            <img src="./img/logo_bri.svg" alt="Bank BRI" className="img-fluid mb-3" />
            <h5>No. Rekening: 1234 5678 9101</h5>
            <p className="text-muted">a.n. Nama Penerima</p>
            <button className={`btn btn-secondary ${copied ? "copied" : ""}`} onClick={copyToClipboard}>
              {copied ? "Berhasil Disalin" : "Salin No. Rekening"}
            </button>
          </div>
        )}
      </div>

      {/* Section 7 - Ucapan dan Doa */}
      <div className="py-5 text-center" style={{
        backgroundColor: "#e8d4cc"
      }}>
        <div className="container">
          <div className="row justify-content-center">
            {/* Card */}
            <div className="col-md-8 col-sm-10 mb-4">
              <div className="card-resepsi p-4 shadow-sm position-relative" style={{
                borderRadius: "15px",
                backgroundColor: "#a47551"
              }}>

                <div className="position-relative text-white">
                  <h1 className="fw-bold">Ucapan & Doa</h1>
                  <div className="card">
                    <p className="fw-italic">“Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day”</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Section 8 - Wedding Gallery */}
      <div className="d-flex flex-column align-items-center text-center py-5" style={{ background: "#a47551" }}>
        <h1 className="text-white mb-4">Wedding Gallery</h1>
        <div className="d-flex flex-row flex-wrap justify-content-center gap-3">
          <img src="./img/mempelai1.png" alt="Mempelai 1" className="img-fluid" style={{ maxWidth: "300px" }} />
          <img src="./img/mempelai2.png" alt="Mempelai 2" className="img-fluid" style={{ maxWidth: "300px" }} />
        </div>
      </div>

      {/* Section 9 - Terima Kasih */}
      <div
        className="position-relative d-flex flex-column align-items-center justify-content-center text-center py-5"
        style={{
          height: "500px",
          overflow: "hidden",
          // position: "relative",
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="position-absolute w-100 h-100 transition-fade"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover", // Pastikan gambar tidak terlalu besar
              backgroundPosition: "center", // Agar gambar tetap terpusat
              backgroundRepeat: "no-repeat",
              opacity: index === currentImage ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
        ))}


        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}></div>

        <div className="position-relative text-white p-4" style={{ maxWidth: "600px", zIndex: 2 }}>
          <h1 className="fw-bold">Terima Kasih</h1>
          <p className="mt-3">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i,
            berkenan hadir dan memberikan do’a restu kepada kami.
          </p>
          <h5 className="mt-4 fw-bold">KAMI YANG BERBAHAGIA</h5>
          <h1 className="fw-bold" style={{ fontFamily: "cursive" }}>Auliya & Suami</h1>
        </div>
      </div>

      {/* Tombol kontrol musik */}
      {isOpen && (
        <button onClick={handleToggleMusic} className="btn btn-light position-fixed bottom-0 end-0 m-3" style={{ zIndex: 11 }}>
          {isMusic ? <i className="bi bi-pause-circle"></i> : <i className="bi bi-play-circle"></i>}
        </button>
      )}

      {/* Audio */}
      <audio ref={audioRef} src="/music/song.mp3" preload="auto" />
    </div>
  );
}
