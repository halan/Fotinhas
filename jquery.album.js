(function($){

var por_pagina = 15;

var igualar_tamanho = function(a, b)
{
    a.css({'width': b.outerWidth()+'px', 'height': b.outerHeight()+'px'})
};

$.fn.album = function()
{
  var album = $(this)
  var links_fotos = $('ul a', album);
  var palco = $('.palco');
  var paginacao = $('.paginacao');
  var legendabg = $('<div class="legenda-bg"></div>');
  var legendact = $('<div class="legenda-ct"></div>');
  var legenda = $('<div class="legendas"></div>');
  var fotos = $();
  var pagina_atual = 0;
  var total_fotos = links_fotos.length;
  
  var total_paginas = Math.floor(total_fotos/por_pagina)+!!total_fotos%por_pagina;

  palco.css({'position': 'relative', 'overflow': 'hidden'});

  links_fotos.each(function(i)
  {
    var link = $(this).attr('href');
    var foto = $('<img src="'+link+'" />').css({'position': 'absolute'}).fadeOut();
    if(i == 0) foto.addClass('primeiro');
    fotos = fotos.add(foto);
    palco.append(foto);
    igualar_tamanho(palco, foto);
  });

  legendact.append(legenda);
  palco.append(legendabg.css({'position': 'absolute', 'bottom': 0, 'width': '100%'}));
  palco.append(legendact.css({'position': 'absolute', 'bottom': 0, 'width': '100%'}));

  var atualizar_legenda = function(l)
  {
    legenda.fadeOut(function()
    {
      $(this).html(l)
      if(l)
      {
        legendabg.fadeIn();
        legendabg.animate({'height': legenda.outerHeight()});
      }
      else legendabg.fadeOut();

      $(this).fadeIn();
    });
   
  };

  links_fotos.click(function()
  {
    var a = $(this);
    
    legenda_txt = $('img', a).attr('alt');
   
    atualizar_legenda(legenda_txt);

    if(legenda_txt == '') legendabg.fadeOut();
    else legendabg.fadeIn();
        
    links_fotos.removeClass('atual');
    a.addClass('atual');
    
    var fades = 0;
    fotos.fadeOut(function()
    {
      fades++;
      if(fades == fotos.length)
      {
	var foto = fotos.filter(function(){return $(this).attr('src') == a.attr('href')});
        igualar_tamanho(palco, foto);
        foto.fadeIn();
      }
    });

    return false;
  });

  abrir_pagina = function(p)
  {
    
    links_fotos.parents('li').hide();
    var fotos_dessa_pagina = links_fotos.parents('li').filter(function(i)
    {
      i = links_fotos.parents('li').length-1-i;

      return i >= p*por_pagina && i < (p+1)*por_pagina; 
    });
    
    $('a', paginacao).removeClass('atual').eq(p).addClass('atual');
    fotos_dessa_pagina.show();
    $('a', fotos_dessa_pagina).last().click();
    return fotos_dessa_pagina
  };

  largura_bolinhas = 0;
  for(i=0; i<total_paginas; i++)
  {
    var a = $('<a href="#">'+(i+1)+'</a>');
    paginacao.append(a);
    largura_bolinhas +=  a.outerWidth();
    largura_bolinhas += parseInt(a.css('margin-left').split('px')[0]);
    largura_bolinhas += parseInt(a.css('margin-right').split('px')[0]);
  }
  if(paginacao.hasClass('centralizado'))
    paginacao.css({'position': 'relative',
                   'left': ((palco.outerWidth()/2)-(largura_bolinhas/2))+'px'});


  $('a', paginacao).click(function()
  {
    abrir_pagina(parseInt($(this).text())-1); 
    
    return false;
  });


  abrir_pagina(0);
  links_fotos.first().click();

};


})(jQuery);

