module ApplicationHelper

  def today
    current_page[1..-1].to_i
  end

  def day(date, content)
    @date = date(date)
    @mark = mark(date)
    @content = content(date, content)
    partial 'day'
  end

  def date(date)
    formatted_date = "%02d" % date
    formatted_date = 'http://suderman.me/advent/images/' + formatted_date
    return formatted_date + '.gif' if date < today
    return formatted_date + '-active.gif' if date == today
    return formatted_date + '-coming.gif' if date > today
  end

  def mark(date)
    mark = 'b.gif'
    mark = 'm.jpg' if date == today
    return 'http://suderman.me/advent/images/' + mark
  end

  def content(date, content)
    content = '<img src="http://suderman.me/advent/images/blur.jpg">' if date > today
    return content
  end


  def pick_one(a)
    a[rand(a.length)]
  end

end
