$(function(){function t(){var t=[];$(".summary > tbody > tr").each(function(e,r){var a={name:$(this).find(".name").text(),price:$(this).find(".price").text()};t.push(a)});var e=JSON.stringify(t);localStorage.setItem("cartItems",e)}function e(e){e.remove(),a(),t(),0===$(".summary > tbody > tr").length&&$(".cart").addClass("empty")}function r(e){$(".cart").removeClass("empty"),$(".summary > tbody").append("<tr><td class='name'>"+e.name+"</td><td class='price'>"+e.price+"</td><td class='del'><button type='button'>X</button></td</tr>"),$(".hidden").css("display","block"),a(),t()}function a(){var t=0;$(".summary > tbody > tr").each(function(e,r){var a=$(r).find(".price").text();t+=+a}),$(".summary .sum").text(t+" грн.")}function n(){$(" .order p.error").remove(),$(".form-order p input").removeClass("error")}localStorage.cartItems===[]&&$(".cart .hidden").css("display","none");for(var o=localStorage.getItem("cartItems"),s=JSON.parse(o)||[],c=0;c<s.length;c++)r(s[c]);$(".list").on("click",".buy",function(t){var e=$(t.target).closest(".box");r({id:e.attr("id"),name:e.find(".name").text(),price:e.find(".price-value").text()})}),$(".summary").click(function(t){var r=$(t.target);if(r.is(".del > button")){e(r.closest("tr"))}}),$(".form-order p input").on("focus",function(){n()}),$(".btn-order").on("click",function(t){t.preventDefault(),n();var e={surname:$("#surname").val(),name:$("#name").val(),phone:$("#phone").val(),street:$("#street").val(),numb:$("#numb").val(),apartment:$("#apartment").val(),nameOrder:$(".summary .name").text(),sumOder:$(".summary .sum").text()};$.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:"/cart/order"}).done(function(t){t.ok?($(".top").after('<p class="success">Ваше замовлення прийнято!</p>'),localStorage.clear(),setTimeout(function(){$(location).attr("href","/")},4e3)):($(".top").after('<p class="error">'+t.error+"</p>"),t.fields&&t.fields.forEach(function(t){$("#"+t).addClass("error")}))})})});