export const parseConfig = (baseConfig, userConfig) => {
  const config = baseConfig

  const { entry, module, resolve } = userConfig.webpack
  if (module) {
    const { loaders } = module
    // Add all the custom loaders
    if (Array.isArray(loaders)) {
      loaders.forEach(loader => config.module.loaders.push(loader))
    }
  }

  if (entry) {
    config.entry = entry
  }

  if (resolve) {
    if (Array.isArray(resolve.extensions)) {
      resolve.extensions.forEach(extension => config.resolve.extensions.push(extension))
    }
  }

  return config
}
