module ApplicationHelper

  def today
    20
  end

  def day(date, content)
    @date = date(date)
    @mark = mark(date)
    @content = content(date, content)
    partial 'day'
  end

  def date(date)
    formatted_date = "%02d" % date
    formatted_date = '/images/' + formatted_date
    return formatted_date + '.gif' if date < today
    return formatted_date + '-active.gif' if date == today
    return formatted_date + '-coming.gif' if date > today
  end

  def mark(date)
    mark = 'b.gif'
    mark = 'm.jpg' if date == today
    return '/images/' + mark
  end

  def content(date, content)
    content = '<img src="/images/blur.jpg">' if date > today
    return content
  end


  def pick_one(a)
    a[rand(a.length)]
  end

end
