<script setup lang="ts">
import { h } from 'vue'
import type { SubmitHandler } from '@formisch/vue'
import { Form, Field as FormischField, reset, useForm } from '@formisch/vue'
import * as v from 'valibot'
import { toast } from 'vue-sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(5, 'Bug title must be at least 5 characters.'),
    v.maxLength(32, 'Bug title must be at most 32 characters.'),
  ),
  description: v.pipe(
    v.string(),
    v.minLength(20, 'Description must be at least 20 characters.'),
    v.maxLength(100, 'Description must be at most 100 characters.'),
  ),
})

const form = useForm({
  schema: FormSchema,
  initialInput: {
    title: '',
    description: '',
  },
})

const handleSubmit: SubmitHandler<typeof FormSchema> = (output) => {
  toast('You submitted the following values:', {
    description: h(
      'pre',
      {
        class:
          'bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4',
      },
      h('code', JSON.stringify(output, null, 2)),
    ),
    position: 'bottom-right',
    class: 'flex flex-col gap-2',
    style: {
      '--border-radius': 'calc(var(--radius)  + 4px)',
    },
  })
}
</script>

<template>
  <Card class="w-full sm:max-w-md">
    <CardHeader>
      <CardTitle>Bug Report</CardTitle>
      <CardDescription>
        Help us improve by reporting bugs you encounter.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form id="form-formisch-demo" :of="form" @submit="handleSubmit">
        <FieldGroup>
          <FormischField v-slot="field" :of="form" :path="['title']">
            <Field :data-invalid="field.errors !== null">
              <FieldLabel for="form-formisch-demo-title">
                Bug Title
              </FieldLabel>
              <Input
                id="form-formisch-demo-title"
                v-model="field.input"
                v-bind="field.props"
                :aria-invalid="field.errors !== null"
                placeholder="Login button not working on mobile"
                autocomplete="off"
              />
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </Field>
          </FormischField>

          <FormischField v-slot="field" :of="form" :path="['description']">
            <Field :data-invalid="field.errors !== null">
              <FieldLabel for="form-formisch-demo-description">
                Description
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="form-formisch-demo-description"
                  v-model="field.input"
                  v-bind="field.props"
                  placeholder="I'm having an issue with the login button on mobile."
                  :rows="6"
                  class="min-h-24 resize-none"
                  :aria-invalid="field.errors !== null"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText class="tabular-nums">
                    {{ (field.input ?? '').length }}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Include steps to reproduce, expected behavior, and what
                actually happened.
              </FieldDescription>
              <FieldError
                v-if="field.errors"
                :errors="field.errors.map(message => ({ message }))"
              />
            </Field>
          </FormischField>
        </FieldGroup>
      </Form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" @click="reset(form)">
          Reset
        </Button>
        <Button type="submit" form="form-formisch-demo">
          Submit
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
