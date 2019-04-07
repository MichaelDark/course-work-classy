using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Classy.Web.Api.Hubs
{
    public class ClassyHub : Hub
    {
        public async Task SendTest(string message)
        {
            await this.Clients.Caller.SendAsync(message);
        }
    }
}
