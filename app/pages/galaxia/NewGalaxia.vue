<script setup lang="ts">

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import {FetchError} from 'ofetch'
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();

const schema = z.object({
  nombre: z.string(),
  num_planetas: z.string(),
  curiosidades: z.string(),
  tipo: z.number()

})


type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nombre: undefined,
  num_planetas: undefined,
  curiosidades: undefined,
  tipo: undefined
})

</script>


<template>

       <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Nombre" name="nombre">
            <UInput v-model="state.nombre" />
        </UFormField>

        <UFormField label="Número de planetas" name="num_planetas">
            <UInput v-model="state.num_planetas" type="text"  />
        </UFormField>

         <UFormField label="Curisidades" name="num_planetas">
            <UInput v-model="state.curiosidades" type="text"  />
        </UFormField>

         <UFormField label="Número de planetas" name="num_planetas">
            <UInput v-model="state.tipo" type="text"  />
        </UFormField>

        <!--Login normal-->
        <UButton type="submit">
        Submit
        </UButton>
  </UForm>
</template>
nombre:string, num_planetas:number, curiosidades:string, tipo:string}, id:number