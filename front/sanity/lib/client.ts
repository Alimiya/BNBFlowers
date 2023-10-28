import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: 
  "skZYTYVGi3TDifCk6uyPrgeodlWGSjm1OVNs3F63zHMRyewJg0qSLMgFWGEwqct0zUlp86k52p2dkSDo2i0e2u4joXBAiHQ1BH282YC1K8oQ7QUN4eVZV6mJIFDXPZRLRIXXMweIcf1sXAxFSeENjdKyMECuevLp7P9wXP2A4fJzgaSoG3k1",
})
