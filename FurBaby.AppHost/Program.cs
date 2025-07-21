using Google.Protobuf.WellKnownTypes;

var builder = DistributedApplication.CreateBuilder(args);

var sqlserver = builder.AddSqlServer("sqlserver")
    .WithLifetime(ContainerLifetime.Persistent);

var cache = builder.AddRedis("cache");

var db1 = sqlserver.AddDatabase("db1");

var migrationService = builder.AddProject<Projects.Furbaby_MigrationService>("migration")
    .WithReference(db1)
    .WaitFor(db1);

var apiService = builder.AddProject<Projects.FurBaby_ApiService>("apiservice")
    .WithReference(db1)
    .WaitForCompletion(migrationService);

// Add React frontend as an external project
builder.AddNpmApp("reactfrontend", "../furbaby.web")
       .WithExternalHttpEndpoints()
       .WithReference(apiService)
       .WaitFor(apiService)
       .WithEnvironment("BROWSER", "none")
       .WithEnvironment("VITE_API_URL", apiService.GetEndpoint("http"))
       .WithHttpEndpoint(env: "VITE_PORT")
       .PublishAsDockerFile();

builder.Build().Run();
