using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Classy.Web.Api
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddMvc();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseSignalR(routes =>
            {
                routes.MapHub<Hubs.ClassyHub>("/classy", options =>
                {
                    // 30Kb message buffer
                    options.ApplicationMaxBufferSize = 1000000 * 2048;
                });
            });

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyOrigin());
            app.UseAuthentication();
            //app.UseMvcWithDefaultRoute();

            //app.UseCors(builder =>
            //{
            //    builder.WithOrigins("http://localhost:4200")
            //    .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            //});

            app.UseStaticFiles();
            app.UseDefaultFiles();

            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

            app.UseMvc();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Test");

            });


        }
    }
}
