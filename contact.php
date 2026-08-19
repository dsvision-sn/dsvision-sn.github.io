<?php
// Protection : s'assurer que les données sont envoyées via la méthode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Récupération et nettoyage des données soumises
    $nom = filter_var(trim($_POST["nom"]), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $telephone = filter_var(trim($_POST["telephone"]), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $service = filter_var(trim($_POST["service"]), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    // 2. Vérification des champs obligatoires
    if (empty($nom) || !$email || empty($message)) {
        header("Location: index.html?status=error#contact");
        exit;
    }

    // 3. Adresse e-mail de réception de l'agence
    $destinataire = "contact@dsvision.sn"; // Remplacer par ton vrai e-mail
    $sujet = "Nouveau message de $nom - DS Vision";

    // 4. Construction du contenu du message
    $contenuEmail = "Vous avez reçu une demande depuis le site DS Vision :\n\n";
    $contenuEmail .= "Nom : $nom\n";
    $contenuEmail .= "E-mail : $email\n";
    $contenuEmail .= "Téléphone : $telephone\n";
    $contenuEmail .= "Service souhaité : $service\n\n";
    $contenuEmail .= "Message :\n$message\n";

    // 5. En-têtes de l'e-mail
    $headers = "From: webmaster@dsvision.sn\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 6. Envoi de l'e-mail
    if (mail($destinataire, $sujet, $contenuEmail, $headers)) {
        // Redirection vers l'accueil avec un message de succès
        header("Location: index.html?status=success#contact");
    } else {
        header("Location: index.html?status=error#contact");
    }
    exit;

} else {
    // Redirection si l'accès direct au fichier est tenté sans soumettre le formulaire
    header("Location: index.html");
    exit;
}
?>