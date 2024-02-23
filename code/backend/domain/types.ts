interface Services {
    functionsArray: [(params: { exerciseId: string }) => Promise<Response>];
}