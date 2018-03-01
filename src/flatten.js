SVG.extend(SVG.Parent, {
  flatten: function (parent) {
    if (this instanceof SVG.Defs) return this

    parent = parent || (this instanceof SVG.Doc && this.isRoot() ? this : this.parent(SVG.Parent))

    this.each(function () {
      if (this instanceof SVG.Defs) return this
      if (this instanceof SVG.Parent) return this.flatten(parent)
      return this.toParent(parent)
    })

    // we need this so that SVG.Doc does not get removed
    this.node.firstElementChild || this.remove()

    return this
  }
})
