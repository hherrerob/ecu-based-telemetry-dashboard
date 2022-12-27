<template>
  <div>
    <b-overlay :show="show" rounded="sm">
      <b-card>
        <b-card-body>
          <input class="form-control mb-3"
                 type="file"
                 id="formFile"
                 @change="(event) => { addFile(event.target.files) }" />

          <b-button-group>
            <b-button variant="success" size="lg"
                      :disabled="pathToDatabaseFile === null"
                      @click="load">
              Load
            </b-button>
            <b-button variant="danger" size="lg"
                      :disabled="pathToDatabaseFile === null">
              Purge
            </b-button>
          </b-button-group>
        </b-card-body>
      </b-card>
    </b-overlay>
  </div>
</template>

<script setup lang="tsx">
import { ipcRenderer } from "electron"
import { Ref, ref } from 'vue'
import { useRouter } from "vue-router"
import { DASHBOARD_ROUTE } from '../routes/routes'

const show = ref(false)
const router = useRouter()
const pathToDatabaseFile: Ref<Nullable<File>> = ref(null)

const addFile = (fileList: FileList): void => {
  pathToDatabaseFile.value = fileList.length ? fileList[0] : null
}

const goToDashboard = (): void => {
  router.push(DASHBOARD_ROUTE.path)
}

const SET_DATABASE_EVENT = 'set-database'

const load = (): void => {
  show.value = true
  ipcRenderer.invoke(SET_DATABASE_EVENT, [pathToDatabaseFile.value?.path, pathToDatabaseFile.value?.name])
      .then((wasDatabaseSet) => {
        if (wasDatabaseSet) {
          // goToDashboard()
        } else {
          console.log(wasDatabaseSet)
        }
      }).finally(() => {
        show.value = false
      })
}
</script>
