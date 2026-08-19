// Liste des images de la galerie
const imagesGalerie = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"
];

let imageActuelle = 0;

// Menu mobile
function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.classList.toggle("active");
    }
}

// Fonction d'interaction bouton contact sur l'accueil
function direBonjour() {
    const message = document.getElementById("message");
    const bouton = document.getElementById("btnContact");

    if (message && bouton) {
        message.innerHTML = "🎉 Merci ! L'équipe DS Vision vous contactera très rapidement.";
        message.style.color = "#25D366";
        message.style.fontWeight = "bold";
        message.style.display = "block";

        bouton.innerHTML = "✔ Message envoyé";
        bouton.style.backgroundColor = "#1da851";
        bouton.style.color = "white";
        bouton.disabled = true;

        setTimeout(() => {
            message.style.display = "none";
            bouton.innerHTML = "Nous contacter";
            bouton.style.backgroundColor = "";
            bouton.style.color = "";
            bouton.disabled = false;
        }, 3000);
    }
}

// Visionneuse (Lightbox)
function ouvrirLightbox(image) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    if (lightbox && lightboxImage) {
        lightboxImage.src = image.src;
        imageActuelle = imagesGalerie.findIndex(photo => image.src.includes(photo));
        if (imageActuelle === -1) imageActuelle = 0;
        lightbox.style.display = "flex";
    }
}

function fermerLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.style.display = "none";
    }
}

function imageSuivante() {
    imageActuelle = (imageActuelle + 1) % imagesGalerie.length;
    document.getElementById("lightboxImage").src = imagesGalerie[imageActuelle];
}

function imagePrecedente() {
    imageActuelle = (imageActuelle - 1 + imagesGalerie.length) % imagesGalerie.length;
    document.getElementById("lightboxImage").src = imagesGalerie[imageActuelle];
}

// Fermer la lightbox si on clique à l'extérieur de l'image
window.addEventListener("click", function (e) {
    const lightbox = document.getElementById("lightbox");
    if (e.target === lightbox) {
        fermerLightbox();
    }
});

// Navigation au clavier pour la lightbox
window.addEventListener("keydown", function (e) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.style.display === "flex") {
        if (e.key === "Escape") fermerLightbox();
        if (e.key === "ArrowRight") imageSuivante();
        if (e.key === "ArrowLeft") imagePrecedente();
    }
});
// Vérifier la présence d'un statut de message dans l'URL après envoi PHP
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const statusMessage = document.getElementById("statusMessage");

    if (statusMessage) {
        if (status === "success") {
            statusMessage.innerHTML = "<p style='color: #25D366; font-weight: bold;'>🎉 Votre message a été envoyé avec succès ! Nous vous recontacterons sous peu.</p>";
        } else if (status === "error") {
            statusMessage.innerHTML = "<p style='color: #ff3333; font-weight: bold;'>❌ Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter par WhatsApp.</p>";
        }
    }
});