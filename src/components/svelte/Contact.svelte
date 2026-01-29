<script lang="ts">
    import SvgGitHub from "@assets/github.svg";
    import SvgLinkedin from "@assets/linkedin-svgrepo-com.svg";
    import SvgMail from "@assets/mail.svg";
</script>

<div class="flex space-x-1.5 items-center">
    <a class="h-7 w-7" href="https://github.com/SalvadorGriaule">
        <img class="w-full h-full" src={SvgGitHub.src} alt="Logo GitHub">
    </a>
    <a class="h-10 w-10" href="https://www.linkedin.com/in/quentin-morales-597910215/">
        <img class="w-full h-full" src={SvgLinkedin.src} alt="Logo Linkedin">
    </a>
    <a class="h-10 w-10" href="mailto:morales.quentin@gmx.fr">
        <img class="w-full h-full" src={SvgMail.src} alt="Logo Mail">
    </a>
</div>