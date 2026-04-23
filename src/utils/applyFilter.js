export const applyDigitalCameraEffect = (ctx, canvas, type = "flash") => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

    for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvas.width;
        const y = Math.floor(i / 4 / canvas.width);

        const dx = x - centerX;
        const dy = y - centerY;
        // const distance = Math.sqrt(dx * dx + dy * dy);
        // const vignette = 1 - distance / maxDistance;

        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // 🎯 FLASH (overexposed + harsh vignette)
        if (type === "flash") {
            // 🎯 warm flash white balance shift
            r *= 1.15;
            g *= 1.08;
            b *= 0.92;

            // 🔆 contrast boost (harsh digicam look)
            r = (r - 128) * 1.25 + 128;
            g = (g - 128) * 1.25 + 128;
            b = (b - 128) * 1.25 + 128;

            // 💡 flash brightness pop
            const flash = 30;
            r += flash;
            g += flash;
            b += flash;

            // 🌟 highlight bloom
            if (r > 200) r += 10;
            if (g > 200) g += 10;
            if (b > 200) b += 10;

            // 🌫️ CCD grain
            const noise = (Math.random() - 0.5) * 30;
            r += noise;
            g += noise;
            b += noise;
        }

        // 📱 NOKIA (cool, slightly green/blue, low quality digital cam)
        if (type === "nokia") {
            r *= 0.9;
            g *= 1.05;
            b *= 1.2;

            r += 5;
            g += 10;
            b += 20;
        }

        // 📼 VINTAGE (warm, faded, nostalgic)
        if (type === "vintage") {
            r *= 1.2;
            g *= 1.05;
            b *= 0.8;

            r += 15;
            g += 5;
            b -= 5;
        }

        // 🌙 NIGHT MODE (dark + noisy + low light feel)
        if (type === "night") {
            r *= 0.7;
            g *= 0.7;
            b *= 0.75;

            const noise = (Math.random() - 0.5) * 40;
            r += noise;
            g += noise;
            b += noise;
        }

        // 🎞️ shared grain (all filters)
        const noise = (Math.random() - 0.5) * 20;
        r += noise;
        g += noise;
        b += noise;

        // clamp values (important for real look)
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
    }

    ctx.putImageData(imageData, 0, 0);
};
