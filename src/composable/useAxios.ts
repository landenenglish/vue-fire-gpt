import { computed, readonly, ref, Ref, MaybeRef, unref } from 'vue'
import { AxiosError, AxiosResponse } from 'axios'

export type useAxiosStatus = 'initial' | 'loading' | 'error' | 'success'

export type RequestFnReturnType<F> = F extends (...args: any[]) => Promise<AxiosResponse<infer R>>
  ? R
  : never

export type useAxiosReturnType<R, F> = F extends (data: any) => infer S ? S : R

export interface useAxiosErrorHandlerParams {
  error: AxiosError
  pageName?: string
  notifyDefaultFailure?: boolean
}

export type useAxiosConfig<FormatFn = unknown, Data = unknown> = Partial<{
  formatFn: FormatFn
  onSuccess: (data: Data) => void
  onError: (error: AxiosError) => void
  onFinally: (data: Data | undefined, error: AxiosError | undefined) => void
  notifySuccess: string
  notifyFailure: string
  initialData: Data
  resetOnInvoke: boolean
  immediate: boolean
  pageName: string
  notifyDefaultFailure: boolean
  errorHandler: ({ error, pageName, notifyDefaultFailure }: useAxiosErrorHandlerParams) => unknown
  notifySuccessFn: (message: string) => void
  notifyFailureFn: (message: string) => void
}>

const defaultConfig = {}

export const useAxios = <
  RequestFn extends (...args: readonly any[]) => Promise<AxiosResponse>,
  FormatFn extends ((data: RequestFnReturnType<RequestFn>) => any) | undefined = undefined,
  Data = useAxiosReturnType<RequestFnReturnType<RequestFn>, FormatFn>,
>(
  requestFn: RequestFn,
  configuration: MaybeRef<useAxiosConfig<FormatFn, Data>> = {}
) => {
  const config = computed(() => ({ ...defaultConfig, ...unref(configuration) }))
  const data = ref(config.value.initialData) as Ref<Data | undefined>
  const status = ref<useAxiosStatus>('initial')
  const statusCode = ref<number>()
  const error = ref()

  const updateStatus = (
    newStatus: useAxiosStatus,
    responseStatusCode?: number,
    err?: AxiosError
  ) => {
    status.value = newStatus
    statusCode.value = responseStatusCode ?? undefined
    error.value = err ?? undefined
  }

  const reset = () => {
    data.value = config.value.initialData
    updateStatus('initial')
  }

  const invoke = async (...args: Parameters<typeof requestFn>) => {
    updateStatus('loading')

    if (config.value.resetOnInvoke) data.value = config.value.initialData

    try {
      const response = (await requestFn(...args)) as AxiosResponse<Data>

      response.data = config.value.formatFn
        ? config.value.formatFn(response.data as RequestFnReturnType<RequestFn>)
        : response.data

      data.value = response.data

      updateStatus('success', response.status)

      config.value.onSuccess?.(data.value)

      if (config.value.notifySuccess) config.value.notifySuccessFn?.(config.value.notifySuccess)

      return response.data
    } catch (err: unknown) {
      const axiosError = err as AxiosError

      if (axiosError?.code === 'ERR_CANCELED') return

      updateStatus('error', axiosError.status, axiosError)

      config.value.onError?.(axiosError)

      if (config.value.notifyFailure) config.value.notifyFailureFn?.(config.value.notifyFailure)

      config.value.errorHandler?.({
        error: axiosError,
        pageName: config.value.pageName,
        notifyDefaultFailure: config.value.notifyDefaultFailure && !config.value.notifyFailure,
      })
    } finally {
      config.value.onFinally?.(data.value, error.value)
    }
  }

  if (config.value.immediate && requestFn.length === 0)
    invoke(...([] as unknown as Parameters<typeof requestFn>))

  return {
    invoke,
    data,
    reset,
    statusCode: readonly(statusCode),
    error: readonly(error),
    isInitial: computed(() => status.value === 'initial'),
    isLoading: computed(() => status.value === 'loading'),
    isError: computed(() => status.value === 'error'),
    isSuccess: computed(() => status.value === 'success'),
  }
}

/**
 * Initialize the useAxios composable with the provided default configuration.
 * @param defaultConfig The default configuration to initialize the useAxios composable with.
 */
export const setDefaultuseAxiosConfig = (config: useAxiosConfig) =>
  Object.assign(defaultConfig, config)
