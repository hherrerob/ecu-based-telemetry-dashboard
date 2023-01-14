<template>
  <div class="center">
    <b-overlay :show="show" rounded="sm">
      <b-card class="border">
        <b-card-body>
          <input class="form-control mb-3"
                 type="file"
                 id="formFile"
                 @change="(event) => { addFile(event.target.files) }"/>

          <b-row>
            <b-col>
              <b-button variant="success"
                        class="w-100"
                        :disabled="pathToDatabaseFile === null"
                        @click="load">
                Load
              </b-button>
            </b-col>

            <b-col>
              <b-button variant="danger"
                        class="w-100"
                        :disabled="pathToDatabaseFile === null"
                        @click="purge">
                Purge
              </b-button>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-overlay>
  </div>
</template>

<script setup lang="tsx">
import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DASHBOARD_ROUTE } from '../routes/constants'
import { purgeDatabase, setDatabase } from '../composition/useIpcCommunication'

const show = ref(false)
const router = useRouter()
const pathToDatabaseFile: Ref<Nullable<File>> = ref(null)

const addFile = (fileList: FileList) => {
  pathToDatabaseFile.value = fileList.length ? fileList[0] : null
}

const goToDashboard = () => {
  router.push(DASHBOARD_ROUTE.path)
}

const SET_DATABASE_EVENT = 'set-database'

const load = () => {
  show.value = true

  setDatabase(pathToDatabaseFile.value?.path || '',
      pathToDatabaseFile.value?.name || '')
      .then(() => {
        goToDashboard()
      })
      .finally(() => {
        show.value = false
      })
}

const purge = () => {
  show.value = true
  purgeDatabase(pathToDatabaseFile.value?.path || '',
      pathToDatabaseFile.value?.name || '')
      .then(() => {
        pathToDatabaseFile.value = null
      })
      .finally(() => {
        show.value = false
      })
}
</script>

<style>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>