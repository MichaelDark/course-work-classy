using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Classy.Web.Api.Hubs
{
    public class ClassyHub : Hub
    {
        public static Dictionary<ClaimsPrincipal, IFormFile> Storage = new Dictionary<ClaimsPrincipal, IFormFile>();
        public async Task SendTest(IFormFile file)
        {
            Storage.Add(this.Context.User, file);
            await Clients.Caller.SendAsync("OK");
        }
    }
}
