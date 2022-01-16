using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using contactly.Models;

namespace contactly.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private IMemoryCache _cache;
        private readonly ILogger<ContactController> _logger;

        public ContactController(ILogger<ContactController> logger, IMemoryCache memoryCache)
        {
            _logger = logger;
            _cache = memoryCache;
        }
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            List<Contact> contacts = Context.GetContactsFromMemory(_cache);
            return contacts.ToArray();
        }
        [HttpPost]
        public ActionResult Post([FromBody] Contact contact)
        {
            //Get context from cache memory
            List<Contact> contacts = Context.GetContactsFromMemory(_cache);
            //Remove previous info from memory
            Context.RemoveFromMemory(contact, contacts, _cache);
            //Add new info to memory
            Context.AddToMemory(contact, contacts, _cache);
            //Return status
            return Content("Contact info updated.");

        }

        [HttpDelete]
        public ActionResult Delete([FromBody] Contact contact)
        {
            //Get context from cache memory
            List<Contact> contacts = Context.GetContactsFromMemory(_cache);
            //Add the contact information to the list
            Context.RemoveFromMemory(contact, contacts, _cache);
            //Return status
            return Content("Contact info deleted.");
        }

    }
}
