// Fungsi untuk membuat efek fade in
export function fadeIn(object:any, duration:number) {
    let startTime :number | null = null;

    function animate(timestamp:number) {
        if (!startTime) startTime = timestamp!;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        object.material.opacity = progress; // Mengatur opacity objek

        if (progress < 1) {
            requestAnimationFrame(animate);
        }else {
            // Setelah selesai fade in, atur objek menjadi terlihat
            object.visible = true;
        }
    }

    requestAnimationFrame(animate);
}

// Fungsi untuk membuat efek fade out
export async function fadeOut (object:any, duration:number) {
    let startTime :number | null = null;

    function animate(timestamp:number) {
        if (!startTime) startTime = timestamp!;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        object.material.opacity = 1 - progress; // Mengatur opacity objek

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Setelah selesai fade out, atur objek menjadi tidak terlihat
            object.visible = false;
        }
    
        
    }

    await requestAnimationFrame(animate);
   
}
