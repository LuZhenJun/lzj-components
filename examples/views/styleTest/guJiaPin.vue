<template>
    <div class="flex-ju-al-center mt-40">
        <div class="card mr-40">
            <div class="image">
                <img src="https://assets.codepen.io/2002878/wake-up-and-code.jpg" alt="" />
            </div>
            <div class="content">
                <h4>CodingStartup</h4>
                <div class="description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quasi enim facere commodi omnis...
                </div>
            </div>
        </div>
        <div class="card loading">
            <div class="image"></div>
            <div class="content">
                <h4></h4>
                <div class="description"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'guJiaPin'
};
</script>

<style scoped>

body {
    background-color: #fff;
    font-family: Helvetica;
    font-size: 15px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-height: 100vh;
}

.card {
    width: 320px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12);
}

.image {
    height: 200px;
    background: #bbbbbb;
}

.image img {
    display: block;
    width: 100%;
    height: inherit;
    object-fit: cover;
}

.content {
    padding: 2rem 1.8rem;
}

h4 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
}

.description {
    font-size: 1rem;
    line-height: 1.4rem;
}

.loading .image,
.loading h4,
.loading .description {
    background: linear-gradient(100deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 60%) #bbbbbb;
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
    to {
        background-position-x: -20%;
    }
}

.loading h4 {
    min-height: 1.6rem;
    border-radius: 4px;
    animation-delay: 0.05s;
}

.loading .description {
    min-height: 4rem;
    border-radius: 4px;
    animation-delay: 0.06s;
}
</style>
