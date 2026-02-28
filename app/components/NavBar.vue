<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>
<template>
    <UCard class="u-card-header">
        <div v-if="loggedIn" class="flex items-center gap-4">
            <span class="user-info">{{ user?.login }}</span>
            <UButton class="logout-btn" @click="clear(); navigateTo('/login')">Logout</UButton>
        </div>
        <div v-else>
            <UButton class="login-btn" as-child>
                <NuxtLink to="/login">
                    Login
                </NuxtLink>
            </UButton>
        </div>
    </UCard>
</template>
<style >
/*.u-card-header {
    background: rgba(20, 25, 60, 0.55);
    border-radius: 18px;
    box-shadow: 0 2px 18px rgba(124,58,237,0.18);
    padding: 1rem 2rem;
    margin: 1rem auto;
    max-width: 900px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.user-info {
    font-weight: 600;
    color: #a5b9f9;
    margin-right: 1rem;
}
.logout-btn {
    background: linear-gradient(90deg, #7c3aed, #4c1d95);
    color: #fff;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    font-weight: 500;
    transition: 0.2s;
}
.logout-btn:hover {
    background: #38bdf8;
    color: #070b1a;
}
.login-btn {
    background: transparent;
    border: 2px solid #a5b9f9;
    color: #a5b9f9;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    font-weight: 500;
    transition: 0.2s;
}
.login-btn:hover {
    background: #a5b9f9;
    color: #070b1a;
}*/
</style>
