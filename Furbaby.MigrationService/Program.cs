// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using FurBaby.MigrationService;
using FurBaby.Model;
using Microsoft.EntityFrameworkCore;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<ApiDbInitializer>();

builder.AddServiceDefaults();

builder.Services.AddDbContextPool<BreederContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("db1"), sqlOptions =>
        sqlOptions.MigrationsAssembly("Furbaby.MigrationService")
    ));
builder.EnrichSqlServerDbContext<BreederContext>();

var app = builder.Build();

app.Run();
